using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Requestes;
using BikeShop.Products.Domain.DTO.Responses;
using BikeShop.Products.Domain.Entities;
using BikeShop.Products.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.Services
{
    public class StorageService : IStorageService
    {
        private readonly IApplicationDbContext _context;

        public StorageService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddProductsToStorage(List<ProductQuantitySmplDTO> products, int storageId, string source, int sourceId)
        {
            var prodsAsDict = products.ToDictionary(p => p.ProductId, n => n);
            var storageItems = await _context.StorageProducts.Where(n=>n.StorageId == storageId)
                .Where(n => prodsAsDict.Keys.Contains(n.ProductId))
                .ToDictionaryAsync(n=>n.ProductId, n=>n);
            var productsEntitiesDict = await _context.Products
                .Where(n => prodsAsDict
                .Select(m=>m.Key)
                .Contains(n.Id))
                .ToDictionaryAsync(n => n.Id, n => n);
            var newItems = new Dictionary<int, StorageProduct>();
            var newMoves = new Dictionary<int, ProductStorageMove>();
            foreach (var product in products)
            {
                if (storageItems.TryGetValue(product.ProductId, out StorageProduct value))
                {
                    value.Quantity += product.Quantity;
                }
                else
                {
                    if (newItems.TryGetValue(product.ProductId, out StorageProduct value2))
                    {
                        value2.Quantity += product.Quantity;
                    }
                    else
                    {
                        newItems.Add(product.ProductId, new StorageProduct { ProductId = product.ProductId, Quantity = product.Quantity, StorageId = storageId });
                    }
                }


                if (newMoves.TryGetValue(product.ProductId, out ProductStorageMove value3))
                {
                    value3.Quantity += product.Quantity;
                }
                else
                {
                    var prod = productsEntitiesDict[product.ProductId];
                    var productMove = new ProductStorageMove { 
                        ProductId = product.ProductId, 
                        CatalogKey = prod.CatalogKey, 
                        Enabled = prod.Enabled, 
                        MoveDirection = MoveDirection.Get(MoveDirectionEnum.MovingToStorage), 
                        PriceCurrencyId = 0, 
                        IncomePrice = prod.IncomePrice, 
                        ProductName = prod.Name, 
                        Quantity = product.Quantity, 
                        RetailPrice = prod.RetailPrice, 
                        StorageId = storageId, 
                        DealerPrice = prod.DealerPrice, 
                        QuantityUnitId = prod.QuantityUnitId, 
                        ProductMoveSource = ProductMoveSource.Get(ProductMoveSource.Get(source)), 
                        SourceId = sourceId };
                    newMoves.Add(product.ProductId, productMove);
                }
            }

            await _context.StorageProducts.AddRangeAsync(newItems.Values);
            await _context.ProductStorageMoves.AddRangeAsync(newMoves.Values);

            await _context.SaveChangesAsync(new CancellationToken());
        }

        public async Task<List<StorageProductsDTO>> GetByIds(List<int> Ids)
        {
            //Получаем все единицы измерения в виде словаря для дальнейшей быстрой привязки к товару.
            var QuantityUnits = _context.QuantityUnits.ToDictionary(n => n.Id, n => n);

            //Достаем все хранилище с нужными айдишниками товаров
            var allProducts = _context.StorageProducts.Where(n => Ids.Contains(n.ProductId));

            //Создаем список уникальных айдишников складов, на которых есть запрошенные товары
            var storagesList = allProducts.Select(n => n.StorageId).Distinct().ToList();
            //Подтягиваем сущности всех причясных складов
            var storages = _context.Storages.Where(n => storagesList.Contains(n.Id));

            //Получаем сущности всех нужных продуктов в виде словаря.
            //var products = _context.Products.Where(n => prodQuantDict.ContainsKey(n.Id) || prodQuantReservedDict.ContainsKey(n.Id)).ToDictionary(n => n.Id, n => n);
            
            var data = new List<StorageProductsDTO>();
            foreach (var storage in storages)
            {
                


                var skladDevided = new StorageProductsDTO { Storage = storage };
                
                
                
                data.Add(skladDevided);
            }

            
            

            return data;
        }

        public async Task<StorageProductsDTO> GetByStorage(int storageId)
        {
            //Получаем словари для всех товаров на складе, а так же зарезервированных товаров на складе.
            var prodQuantDict = await _context.StorageProducts.Where(n => n.StorageId == storageId).ToDictionaryAsync(n=>n.ProductId, n=>n.Quantity);
            var prodQuantReservedDict = await _context.ProductReservations.Where(n => n.StorageId == storageId).ToDictionaryAsync(n => n.ProductId, n => n.Quantity);
            
            //Получаем сущности всех нужных продуктов в виде словаря.
            var products = await _context.Products.Where(n => prodQuantDict.Keys.Contains(n.Id) || prodQuantReservedDict.Keys.Contains(n.Id)).ToDictionaryAsync(n=>n.Id, n=>n);

            //Получаем доступные товары отнимая от товаров на складе зарезервированные товары
            var prodQuantAvailableDict = prodQuantDict;
            foreach (var prod in prodQuantReservedDict)
            {
                if(prodQuantAvailableDict.ContainsKey(prod.Key))
                prodQuantAvailableDict[prod.Key] -= prod.Value;
            }

            //Получаем все единицы измерения в виде словаря для дальнейшей быстрой привязки к товару.
            var QuantityUnits = _context.QuantityUnits.ToDictionary(n => n.Id, n => n);

            //Создаем списки доступных и зарезервированных продуктов
            var productQuantityDTOAvailable = prodQuantAvailableDict.Select(n => new ProductQuantityDTO { Product = products[n.Key], Quantity = n.Value, QuantityUnit = QuantityUnits[products[n.Key].QuantityUnitId] }).ToList();
            var productQuantityDTOReserved = prodQuantReservedDict.Select(n => new ProductQuantityDTO { Product = products[n.Key], Quantity = n.Value, QuantityUnit = QuantityUnits[products[n.Key].QuantityUnitId] }).ToList();

            //Сущность склада
            var storage = await _context.Storages.FindAsync(storageId);

            //Создаем сущность ответа, заполяем подготовленной информацией и возвращаем.
            return new StorageProductsDTO { Storage = storage, AvailableProducts = productQuantityDTOAvailable, ReservedProducts = productQuantityDTOReserved };

        }

        public async Task<string> GetFromBRUA()
        {
            
            string connectionString = "Server=zf452963.mysql.tools;Database=zf452963_db;Uid=zf452963_db;Pwd=Q9kUMTVr;";
            MySqlConnection dbConnection = new MySqlConnection(connectionString);

            MySqlCommand command = new MySqlCommand("SELECT TovarId, Quantity FROM Storage WHERE Quantity > 0", dbConnection);

            dbConnection.Open();
            

            MySqlDataAdapter adapter = new MySqlDataAdapter(command);
            DataTable dt = new DataTable();
            adapter.Fill(dt);

            var prod = dt.Rows[0];

            string ids = "";

            var prodQuantOldDict = new Dictionary<int, decimal>();
            foreach (DataRow row in dt.Rows) 
            {
                ids = ids + $"Id = {row[0]} OR ";
                var id = int.Parse(row[0].ToString());
                var quant = int.Parse(row[1].ToString());
                if (prodQuantOldDict.ContainsKey(id))
                {
                    prodQuantOldDict[id] += quant;
                }
                else
                {
                    prodQuantOldDict.Add(id, quant);
                }
            }

            ids = ids.Remove(ids.Length - 4);


            MySqlCommand command1 = new MySqlCommand($"SELECT catalog_key, name, price_in, price_out, bar_code, id, category FROM tovars WHERE {ids}", dbConnection);
            MySqlDataAdapter adapter1 = new MySqlDataAdapter(command1);
            DataTable dt1 = new DataTable();
            adapter1.Fill(dt1);

            dbConnection.Close();
            var np = new List<Product>();
            var np1 = new List<ProductCard>();

            var prodQuantUnits = await _context.QuantityUnits.ToDictionaryAsync(n=>n.Id, n=>n.Name);

            var buf = new Dictionary<Product, decimal>();
            foreach (DataRow row in dt1.Rows)
            {
                var net = new Product { Barcode = row[4].ToString(), CatalogKey = row[0].ToString(), CheckStatus = "JustCreatedByScript", DealerPrice = 0, IncomePrice = decimal.Parse(row[2].ToString()) / ((decimal)37.5), RetailPrice = decimal.Parse(row[3].ToString())/((decimal)37.5), Name = row[1].ToString(), QuantityUnitId = 1, BrandId = 1, QuantityUnitName = prodQuantUnits[1], Category = row[6]==null?"": row[6].ToString() };
                np.Add(net) ;
                buf.Add(net, prodQuantOldDict[int.Parse(row[5].ToString())]);
            }

            await _context.Products.AddRangeAsync(np);
            await _context.SaveChangesAsync(new CancellationToken());

            foreach (var item in np)
            {
                await _context.ProductsCards.AddAsync(new ProductCard { ProductId = item.Id, Description = "", DescriptionShort = "" });
                //np1.Add(new ProductCard { ProductId = item.Id, Description = "", DescriptionShort = ""});
            }

            //await _context.ProductsCards.AddRangeAsync(np1);

            await AddProductsToStorage(buf.Select(n=> new ProductQuantitySmplDTO { ProductId = n.Key.Id, Quantity = n.Value}).ToList(), 1, "SupplyInvoice", 0);
            
            await _context.SaveChangesAsync(new CancellationToken());

            return ids;
        }

        public async Task<List<ProductStorageQuantity>> GetIdByStorage(int storageId)
        {
            //Получаем словари для всех товаров на складе, а так же зарезервированных товаров на складе.
            var prodQuantDict = await _context.StorageProducts.Where(n => n.StorageId == storageId).ToDictionaryAsync(n => n.ProductId, n => n.Quantity);
            var prodQuantReservedDict = await _context.ProductReservations.Where(n => n.StorageId == storageId).ToDictionaryAsync(n => n.ProductId, n => n.Quantity);

            //Получаем доступные товары отнимая от товаров на складе зарезервированные товары
            var prodQuantAvailableDict = prodQuantDict;
            foreach (var prod in prodQuantReservedDict)
            {
                if (prodQuantAvailableDict.ContainsKey(prod.Key))
                    prodQuantAvailableDict[prod.Key] -= prod.Value;
            }

            return prodQuantDict.Select(n => new ProductStorageQuantity { ProductId = n.Key, Available = prodQuantAvailableDict[n.Key], Reserved = prodQuantReservedDict.ContainsKey(n.Key)?prodQuantReservedDict[n.Key]:0 }).ToList();
        }

        public async Task UpdateReservationProducts(List<ProductQuantitySmplDTO> OldReservationProducts, List<ProductQuantitySmplDTO> NewReservationProducts, int storageId)
        {
            var Reservation = await _context.ProductReservations.Where(n => n.StorageId == storageId).ToDictionaryAsync(n=>n.ProductId, n=>n);
            var quantitySum = new Dictionary<int, decimal>();
            var reservationToAdd = new List<ProductReservation>();

            if(OldReservationProducts != null)
            foreach (var product in OldReservationProducts)
            {
                if(quantitySum.ContainsKey(product.ProductId)) { quantitySum[product.ProductId] -= product.Quantity; }
                else { quantitySum.Add(product.ProductId, product.Quantity * -1);}
            }

            if (NewReservationProducts != null)
                foreach (var product in NewReservationProducts)
            {
                if (quantitySum.ContainsKey(product.ProductId)) { quantitySum[product.ProductId] += product.Quantity; }
                else { quantitySum.Add(product.ProductId, product.Quantity); }
            }
            
            foreach (var res in quantitySum) 
            {
                if (Reservation.ContainsKey(res.Key)) { Reservation[res.Key].Quantity += res.Value; Reservation[res.Key].UpdatedAt = DateTime.Now; }
                else { reservationToAdd.Add(new ProductReservation { Quantity = res.Value, ProductId = res.Key, StorageId = storageId }); }
            }

            await _context.ProductReservations.AddRangeAsync(reservationToAdd);
            await _context.SaveChangesAsync(new CancellationToken());
        }

        public async Task<string> AITemplate()
        {
            var res = "";
            var prods = await _context.Products.Take(100).ToListAsync();
            prods.ForEach(n => res += $"Id:{n.Id} Name:{n.Name};");
            return res;
        }
    }
}
