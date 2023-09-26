using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.Entities
{
    public class ProductCategory : BaseEntity
    {
        public string Name { get; set; }
        public string? IconUrl { get; set; } = null;
        public string Way { get; set; }
        public string ChildrenIds { get; set; }
        [JsonIgnore]
        [NotMapped]
        public List<int> ChildrenIdsList { get {
                if (!string.IsNullOrWhiteSpace(ChildrenIds)) return ChildrenIds.Split(';').Select(n=>int.Parse(n)).ToList();
                else return new List<int>();
            } set {
                var str = "";
                value.ForEach(n => str += n.ToString()+";");
                str = str.TrimEnd(';');
                ChildrenIds = str;
            } }
        public int ParentId { get; set; }
        public bool IsCollapsed { get; set; }
        public bool IsRetailVisible { get; set; }
        public bool IsB2BVisible { get; set; }
        public int SortOrder { get; set; }
    }
}
