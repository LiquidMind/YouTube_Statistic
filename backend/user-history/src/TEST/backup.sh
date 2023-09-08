#!/bin/bash

# Змінна для зберігання назви вашої бази даних
DB_NAME="watch_history_youtube"

# Змінна для зберігання шляху до директорії, де будуть зберігатися файли резервних копій
BACKUP_DIR="/Users/andrijkozevnikov/Documents/BD_schems_"

# Змінна для зберігання шляху до утиліти mysqldump
MYSQLDUMP_PATH="/usr/local/mysql-8.0.32-macos13-arm64/bin/mysqldump"

# Змінна для зберігання імені користувача бази даних
DB_USER="root"

# Змінна для зберігання пароля користувача бази даних (зверніть увагу, що це може бути небезпечно з точки зору безпеки)
DB_PASS="Kozhevnykov1311"

# Отримання списку всіх таблиць в базі даних
TABLES=$(/usr/local/mysql-8.0.32-macos13-arm64/bin/mysql -u $DB_USER -p$DB_PASS -N -B -e "SHOW TABLES FROM $DB_NAME;")

# Перевірка наявності папки для бекапу
if [ ! -d "$BACKUP_DIR" ]; then
  mkdir -p "$BACKUP_DIR"
fi

# Цикл для створення резервних копій кожної таблиці
for TABLE in $TABLES; do
  $MYSQLDUMP_PATH -u $DB_USER -p$DB_PASS --skip-comments --no-data $DB_NAME $TABLE > "${BACKUP_DIR}${TABLE}.sql" 2>> "${BACKUP_DIR}error.log"
done
