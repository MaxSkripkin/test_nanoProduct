/**
 * Интерфейс забронированных пользователей
 * @interface IBookedUsers
 */
export interface IBookedUsers {
  /**
   * Уникальный идентификатор пользователя
   * @type {string}
   */
  user_id: string,
  /**
   * Уникальный идентификатор врача
   * @type {string}
   */
  doctor_id: string,
  /**
   * Дата и время бронирования
   * @type {Date}
   */
  slot: Date
}
