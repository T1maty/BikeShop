using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.Enums
{
    public enum MoveDirectionEnum
    {
        MovingToStorage,
        MovingFromStorage
    }
    public class MoveDirection
    {
        private static Dictionary<string, MoveDirectionEnum> CreateDict()
        {
            var b = new Dictionary<string, MoveDirectionEnum>();
            b.Add("MovingToStorage", MoveDirectionEnum.MovingToStorage);
            b.Add("MovingFromStorage", MoveDirectionEnum.MovingFromStorage);
            return b;
        }
        public static Dictionary<string, MoveDirectionEnum> Get()
        {
            var b = CreateDict();
            return b;
        }

        public static MoveDirectionEnum Get(string value)
        {
            var b = CreateDict();
            return b[value];
        }

        public static string Get(MoveDirectionEnum value)
        {
            var b = CreateDict();
            return b.Where(n=>n.Value==value).First().Key;
        }
    }
}
