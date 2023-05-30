/**
 * Интерфейс докторов
 * @interface IDoctors
 */
export interface IDoctors {
  /**
   * Имя доктора
   * @type {string}
   */
  name: string,
  /**
   * Специальность доктора
   * @type {string}
   */
  spec: string,
  /**
   * Даты и время доступных для записи приемов
   * @type {Date[]}
   */
  slots: Date[]
}
