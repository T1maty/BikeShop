using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.Enumerables
{
    public class OrderStatus
    {
        public static string Created { get { return "Created"; } }


        //После создания заказа со статусом created, товар заказ должен быть подтвержден, на этапе подтверждения заказу выдается менегер 
        //и магазин, следующий эта по логике идет оплата, в некоторых случаях этот этап может быть пропущен, к примеру, в случае
        public static string WaitingForPayment { get { return "WaitingForPayment"; } }

        //После оплаты или выбора оплаты при получении, заказ переходит в статул комплектации
        public static string WaitingForCollection { get { return "WaitingForCollection"; } }


        //Если заказ содержит товары, которых нету в магазине, создаются запросы на перемещение и статус устанавливаеться ожидание перемещения
        public static string WaitingLogistic { get { return "WaitingLogistic"; } }

        //Дальше у нас два пути, либо заказ ожидает клиента в магазине, если выбран самовывоз, либо сразу переходит в статус ожидания отправки
        //При ближайшей отправке дожны быть отпралены все товары, которые ожидают отправки.
        public static string ReadyInShop { get { return "ReadyInShop"; } }


        // Заказ готов и ожидает отправки.
        public static string WaitingForShipping { get { return "WaitingForShipping"; } }
        //Альтернативный варианты доставки для готового заказа
        public static string Shipped { get { return "Shipped"; } }









        //Два типа оконченных заказов
        public static string Finished { get { return "Finished"; } }
        public static string Canceled { get { return "Canceled"; } }
    }
}
