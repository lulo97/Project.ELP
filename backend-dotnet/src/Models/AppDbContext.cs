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

    public virtual DbSet<consts> consts { get; set; }

    public virtual DbSet<events> events { get; set; }

    public virtual DbSet<examples> examples { get; set; }

    public virtual DbSet<idioms> idioms { get; set; }

    public virtual DbSet<log> log { get; set; }

    public virtual DbSet<meanings> meanings { get; set; }

    public virtual DbSet<part_of_speechs> part_of_speechs { get; set; }

    public virtual DbSet<phrases> phrases { get; set; }

    public virtual DbSet<posts> posts { get; set; }

    public virtual DbSet<source_translates> source_translates { get; set; }

    public virtual DbSet<sources> sources { get; set; }

    public virtual DbSet<speaking_scores> speaking_scores { get; set; }

    public virtual DbSet<speakings> speakings { get; set; }

    public virtual DbSet<synonyms> synonyms { get; set; }

    public virtual DbSet<tts> tts { get; set; }

    public virtual DbSet<users> users { get; set; }

    public virtual DbSet<words> words { get; set; }

    public virtual DbSet<writing_answers> writing_answers { get; set; }

    public virtual DbSet<writing_questions> writing_questions { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql("Name=DefaultConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresExtension("elp", "dblink");

        modelBuilder.Entity<consts>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("consts", "elp");

            entity.Property(e => e.key).HasComment("yyyy");
            entity.Property(e => e.visible).HasDefaultValue(false);
        });

        modelBuilder.Entity<events>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("events", "elp");
        });

        modelBuilder.Entity<examples>(entity =>
        {
            entity.HasKey(e => e.id).HasName("examples_pkey");

            entity.ToTable("examples", "elp");
        });

        modelBuilder.Entity<idioms>(entity =>
        {
            entity.HasKey(e => e.id).HasName("idioms_pkey");

            entity.ToTable("idioms", "elp");
        });

        modelBuilder.Entity<log>(entity =>
        {
            entity.HasKey(e => e.id).HasName("log_pkey");

            entity.ToTable("log", "elp");

            entity.Property(e => e.created_at)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp without time zone");
        });

        modelBuilder.Entity<meanings>(entity =>
        {
            entity.HasKey(e => e.id).HasName("meanings_pkey");

            entity.ToTable("meanings", "elp");
        });

        modelBuilder.Entity<part_of_speechs>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("part_of_speechs", "elp");
        });

        modelBuilder.Entity<phrases>(entity =>
        {
            entity.HasKey(e => e.id).HasName("phrases_pkey");

            entity.ToTable("phrases", "elp");
        });

        modelBuilder.Entity<posts>(entity =>
        {
            entity.HasKey(e => e.id).HasName("posts_pkey");

            entity.ToTable("posts", "elp");
        });

        modelBuilder.Entity<source_translates>(entity =>
        {
            entity.HasKey(e => e.id).HasName("source_translates_pkey");

            entity.ToTable("source_translates", "elp");
        });

        modelBuilder.Entity<sources>(entity =>
        {
            entity.HasKey(e => e.id).HasName("sources_pkey");

            entity.ToTable("sources", "elp");
        });

        modelBuilder.Entity<speaking_scores>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("speaking_scores", "elp");
        });

        modelBuilder.Entity<speakings>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("speakings", "elp");
        });

        modelBuilder.Entity<synonyms>(entity =>
        {
            entity.HasKey(e => e.id).HasName("synonyms_pkey");

            entity.ToTable("synonyms", "elp");
        });

        modelBuilder.Entity<tts>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("tts", "elp");
        });

        modelBuilder.Entity<users>(entity =>
        {
            entity.HasKey(e => e.id).HasName("users_pkey");

            entity.ToTable("users", "elp");

            entity.Property(e => e.created_at).HasDefaultValueSql("now()");
            entity.Property(e => e.is_active).HasDefaultValue(true);
        });

        modelBuilder.Entity<words>(entity =>
        {
            entity.HasKey(e => e.id).HasName("words_pkey");

            entity.ToTable("words", "elp");
        });

        modelBuilder.Entity<writing_answers>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("writing_answers", "elp");
        });

        modelBuilder.Entity<writing_questions>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("writing_questions", "elp");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
