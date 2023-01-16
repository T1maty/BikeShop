using BikeShop.Workspace.Application.Interfaces;
using BikeShop.Workspace.Domain;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Workspace.Persistence.Repositories;

// Реализация универсального репозитория на EF
public class EfCoreRepository<TEntity> : IRepository<TEntity>
    where TEntity : BaseEntity
{
    private readonly IApplicationDbContext _context;

    public EfCoreRepository(IApplicationDbContext context) => _context = context;

    // Добавление новой сущности
    public TEntity Add(TEntity entity)
    {
        _context.Set<TEntity>().Add(entity);
        return entity;
    }

    // Удаление сущности из базы по айди
    public async Task<TEntity?> Delete(int id)
    {
        var entity = await _context.Set<TEntity>().FindAsync(id);

        if (entity is not null)
            _context.Set<TEntity>().Remove(entity);

        return entity;
    }

    // Получение одной сущности по айди, при ненаходе возвращает null
    public async Task<TEntity?> Get(int id)
    {
        return await _context.Set<TEntity>().FindAsync(id);
    }

    // Получение всех сущностей
    public async Task<List<TEntity>> GetAll()
    {
        return await _context.Set<TEntity>().ToListAsync();
    }

    // Обновление сущности
    public TEntity Update(TEntity entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
        return entity;
    }
}