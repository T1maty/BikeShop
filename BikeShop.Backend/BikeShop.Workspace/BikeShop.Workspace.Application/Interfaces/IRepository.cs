using BikeShop.Workspace.Domain;

namespace BikeShop.Workspace.Application.Interfaces;

// Интерфейс универсального репозитория на все сущности
public interface IRepository<T> where T : BaseEntity
{
    Task<List<T>> GetAll();
    Task<T?> Get(int id);
    T Add(T entity);
    T Update(T entity);
    Task<T?> Delete(int id);
}