using Microsoft.EntityFrameworkCore;
using Models;
using Utils;
using static Utils.ApiResponse<Models.Words>;
using static Features.WordsTranslation;

public class WordsService
{
    private readonly WordsRepository _repository;

    public WordsService(WordsRepository repository)
    {
        _repository = repository;
    }

    public async Task<ApiResponse<List<Words>>> GetAsync(
        string? word = null,
        int pageIndex = 1,
        int pageSize = 20,
        string? userId = null)
    {
        var query = _repository.Query();

        if (!string.IsNullOrWhiteSpace(word))
            query = query.Where(w => w.Word.ToLower().Contains(word.ToLower()));

        if (!string.IsNullOrWhiteSpace(userId))
            query = query.Where(w => w.UserId == userId);

        query = query
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize);

        var data = await query.ToListAsync();

        return ApiResponse<List<Words>>.Ok(data);
    }

    public async Task<ApiResponse<Words>> AddAsync(Words record, string language = "en")
    {
        try
        {
            if (string.IsNullOrWhiteSpace(record.Word))
                return Fail(ErrorWordEmpty, language);

            if (string.IsNullOrWhiteSpace(record.UserId))
                return Fail(ErrorUserIdEmpty, language);

            var existing = await _repository.Query()
                .FirstOrDefaultAsync(e => e.Word == record.Word && e.UserId == record.UserId);

            if (existing != null)
                return Fail(ErrorDuplicateWord, language);

            var created = await _repository.AddAsync(record);
            return Ok(created);
        }
        catch (Exception ex)
        {
            return Fail(ex.Message);
        }
    }

    public async Task<ApiResponse<Words>> UpdateAsync(Words record, string language = "en")
    {
        if (string.IsNullOrWhiteSpace(record.Id))
            return Fail(ErrorIdEmpty, language);

        if (string.IsNullOrWhiteSpace(record.Word))
            return Fail(ErrorWordEmpty, language);

        if (string.IsNullOrWhiteSpace(record.UserId))
            return Fail(ErrorUserIdEmpty, language);

        var existing = await _repository.Query()
            .FirstOrDefaultAsync(e => e.Word == record.Word && e.UserId == record.UserId && e.Id != record.Id);

        if (existing != null)
            return Fail(ErrorDuplicateWord, language);

        try
        {
            var updated = await _repository.UpdateAsync(record);
            if (updated == null) return Fail(ErrorNotExist);
            return Ok(updated);
        }
        catch (Exception ex)
        {
            return Fail(ex.Message);
        }
    }

    public async Task<ApiResponse<bool>> DeleteAsync(int id, string language = "en")
    {
        try
        {
            var deleted = await _repository.DeleteAsync(id);
            if (!deleted)
                return ApiResponse<bool>.Fail(ErrorNotExist, language);

            return ApiResponse<bool>.Ok(deleted);
        }
        catch (Exception ex)
        {
            return ApiResponse<bool>.Fail(ex.Message);
        }
    }
}
