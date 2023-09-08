import React, { useState } from "react";
import styles from "./DropdownForm.module.css";

const DropdownForm = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelect = (value) => {
    setSelectedValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Додаткова логіка для обробки вибраного значення
    console.log(`Обрано значення: ${selectedValue}`);
  };

  return (
    <form className={styles.dropdownForm} onSubmit={handleSubmit}>
      <label className={styles.dropdownLabel} htmlFor="dropdown">
        Виберіть опцію
      </label>
      <select
        className={styles.dropdownSelect}
        id="dropdown"
        value={selectedValue}
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option value="">Оберіть...</option>
        <option value="popularity">По популярності</option>
        <option value="children">Для дітей</option>
      </select>
      <button className={styles.dropdownSubmit} type="submit">
        Підтвердити
      </button>
    </form>
  );
};

export default DropdownForm;
