namespace BikeShop.Workspace.Application.Common.Exceptions;

public sealed class NotFoundException : Exception
{
    public string EntityName { get; }
    public object NotFoundValue { get; }

    public NotFoundException(string name, object key)
        : base($"Entity '{name}' with value '{key}' not found.")
    {
        EntityName = name;
        NotFoundValue = key;
    }
}