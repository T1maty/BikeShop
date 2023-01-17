namespace BikeShop.Workspace.Application.Common.Exceptions;

public sealed class AlreadyExistsException : Exception
{
    public string EntityName { get; }
    public object ExistingValue { get; }

    public AlreadyExistsException(string name, object key)
        : base($"Entity '{name}' with value '{key}' already exists.")
    {
        EntityName = name;
        ExistingValue = key;
    }
}