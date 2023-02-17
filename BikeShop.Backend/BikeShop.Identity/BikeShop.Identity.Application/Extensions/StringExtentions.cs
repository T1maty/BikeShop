using System.Text.RegularExpressions;

namespace BikeShop.Identity.Application.Extensions;

public static class StringExtentions
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
        str = Regex.Replace(str, "[ ]+", " ");

        return str;
    }

    public static string ToLowerFirstChar(this string str)
    {
        if(string.IsNullOrEmpty(str))
            return str;

        return char.ToLower(str[0]) + str.Substring(1);
    }
}