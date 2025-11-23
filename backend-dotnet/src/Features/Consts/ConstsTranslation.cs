using Utils;

namespace Features
{
    public static class ConstsTranslation
    {
        public static Translation ErrorKeyEmpty = new Translation
        {
            VI = "Key không được để trống!",
            EN = "Key cannot be empty!"
        };

        public static Translation ErrorKeyDuplicate = new Translation
        {
            VI = "Key đã tồn tại!",
            EN = "Key already exists!"
        };

        public static Translation ErrorNotExist = new Translation
        {
            VI = "Bản ghi không tồn tại!",
            EN = "Record does not exist!"
        };
    }
}
