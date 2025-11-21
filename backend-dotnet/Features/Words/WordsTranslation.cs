using Utils;

namespace Features
{

    public static class WordsTranslation
    {
        public static Translation ErrorWordEmpty = new Translation
        {
            VI = "Từ vựng không được để trống!",
            EN = "Word cannot be empty!"
        };

        public static Translation ErrorUserIdEmpty = new Translation
        {
            VI = "UserId không được để trống!",
            EN = "UserId cannot be empty!"
        };

        public static Translation ErrorDuplicateWord = new Translation
        {
            VI = "Từ vựng đã tồn tại!",
            EN = "This word duplicated!"
        };

        public static Translation ErrorNotExist = new Translation
        {
            VI = "Bản ghi không tồn tại!",
            EN = "Record not existed!"
        };

        public static Translation ErrorIdEmpty = new Translation
        {
            VI = "Id không được để trống!",
            EN = "Id cannot be empty!"
        };
    }
}
