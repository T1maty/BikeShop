using System.Text.RegularExpressions;

namespace BikeShop.Service.Application.Extensions;

public static partial class StringExtensions
{
    // Для поиска в базе, приводит в нижний регистр, обрезает пробелы
    public static string ToSearchForm(this string str)
        => str.ToLower().Trim();

    // Для вставки в базу, нормализует и обрезает пробелы
    public static string ToInsertForm(this string str)
    {
        // Нормализует и обрезает пробелы
        str = str.Trim().Normalize();
        // 2+ пробела превращает в 1
        str = MyRegex().Replace(str, " ");

        return str;
    }

    [GeneratedRegex("[ ]+")]
    private static partial Regex MyRegex();
}