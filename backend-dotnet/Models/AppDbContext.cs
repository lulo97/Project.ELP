using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Models;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Consts> Consts { get; set; }

    public virtual DbSet<Events> Events { get; set; }

    public virtual DbSet<Examples> Examples { get; set; }

    public virtual DbSet<Idioms> Idioms { get; set; }

    public virtual DbSet<Log> Log { get; set; }

    public virtual DbSet<Meanings> Meanings { get; set; }

    public virtual DbSet<PartOfSpeechs> PartOfSpeechs { get; set; }

    public virtual DbSet<Phrases> Phrases { get; set; }

    public virtual DbSet<Posts> Posts { get; set; }

    public virtual DbSet<SourceTranslates> SourceTranslates { get; set; }

    public virtual DbSet<Sources> Sources { get; set; }

    public virtual DbSet<SpeakingScores> SpeakingScores { get; set; }

    public virtual DbSet<Speakings> Speakings { get; set; }

    public virtual DbSet<Synonyms> Synonyms { get; set; }

    public virtual DbSet<Tts> Tts { get; set; }

    public virtual DbSet<Users> Users { get; set; }

    public virtual DbSet<Words> Words { get; set; }

    public virtual DbSet<WritingAnswers> WritingAnswers { get; set; }

    public virtual DbSet<WritingQuestions> WritingQuestions { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql("Name=DefaultConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresExtension("elp", "dblink");

        modelBuilder.Entity<Consts>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("consts", "elp");

            entity.Property(e => e.Key)
                .HasComment("yyyy")
                .HasColumnName("key");
            entity.Property(e => e.Value).HasColumnName("value");
            entity.Property(e => e.Visible)
                .HasDefaultValue(false)
                .HasColumnName("visible");
        });

        modelBuilder.Entity<Events>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("events", "elp");

            entity.Property(e => e.Data).HasColumnName("data");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Timestamp).HasColumnName("timestamp");
        });

        modelBuilder.Entity<Examples>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("examples_pkey");

            entity.ToTable("examples", "elp");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Example).HasColumnName("example");
            entity.Property(e => e.PartOfSpeech).HasColumnName("part_of_speech");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Word).HasColumnName("word");
        });

        modelBuilder.Entity<Idioms>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("idioms_pkey");

            entity.ToTable("idioms", "elp");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Example).HasColumnName("example");
            entity.Property(e => e.Idiom).HasColumnName("idiom");
            entity.Property(e => e.Meaning).HasColumnName("meaning");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<Log>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("log_pkey");

            entity.ToTable("log", "elp");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.Text).HasColumnName("text");
        });

        modelBuilder.Entity<Meanings>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("meanings_pkey");

            entity.ToTable("meanings", "elp");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Meaning).HasColumnName("meaning");
            entity.Property(e => e.PartOfSpeech).HasColumnName("part_of_speech");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Word).HasColumnName("word");
        });

        modelBuilder.Entity<PartOfSpeechs>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("part_of_speechs", "elp");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name).HasColumnName("name");
        });

        modelBuilder.Entity<Phrases>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("phrases_pkey");

            entity.ToTable("phrases", "elp");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Example).HasColumnName("example");
            entity.Property(e => e.Meaning).HasColumnName("meaning");
            entity.Property(e => e.Phrase).HasColumnName("phrase");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<Posts>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("posts_pkey");

            entity.ToTable("posts", "elp");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Content).HasColumnName("content");
            entity.Property(e => e.Title).HasColumnName("title");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<SourceTranslates>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("source_translates_pkey");

            entity.ToTable("source_translates", "elp");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Chunk).HasColumnName("chunk");
            entity.Property(e => e.SourceId).HasColumnName("source_id");
            entity.Property(e => e.Translate).HasColumnName("translate");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<Sources>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("sources_pkey");

            entity.ToTable("sources", "elp");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Source).HasColumnName("source");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<SpeakingScores>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("speaking_scores", "elp");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Score).HasColumnName("score");
            entity.Property(e => e.SpeakingId).HasColumnName("speaking_id");
            entity.Property(e => e.Text).HasColumnName("text");
            entity.Property(e => e.TextListened).HasColumnName("text_listened");
        });

        modelBuilder.Entity<Speakings>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("speakings", "elp");

            entity.Property(e => e.Answer).HasColumnName("answer");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Question).HasColumnName("question");
        });

        modelBuilder.Entity<Synonyms>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("synonyms_pkey");

            entity.ToTable("synonyms", "elp");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Note).HasColumnName("note");
            entity.Property(e => e.Synonym).HasColumnName("synonym");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Word).HasColumnName("word");
        });

        modelBuilder.Entity<Tts>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("tts", "elp");

            entity.Property(e => e.AudioBase64).HasColumnName("audio_base64");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Text).HasColumnName("text");
        });

        modelBuilder.Entity<Users>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("users_pkey");

            entity.ToTable("users", "elp");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("created_at");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.FullName).HasColumnName("full_name");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.PasswordHash).HasColumnName("password_hash");
            entity.Property(e => e.Username).HasColumnName("username");
        });

        modelBuilder.Entity<Words>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("words_pkey");

            entity.ToTable("words", "elp");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Word).HasColumnName("word");
        });

        modelBuilder.Entity<WritingAnswers>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("writing_answers", "elp");

            entity.Property(e => e.Answer).HasColumnName("answer");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.QuestionId).HasColumnName("question_id");
            entity.Property(e => e.Review).HasColumnName("review");
        });

        modelBuilder.Entity<WritingQuestions>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("writing_questions", "elp");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Question).HasColumnName("question");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
