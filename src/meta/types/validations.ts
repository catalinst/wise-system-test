export enum RequiredFieldMessage {
  FIRST_NAME = 'First name is required.',
  LAST_NAME = 'Last name is required.',
  EMAIL = 'Email is required.',
  PASSWORD = 'Password is required.',
  TITLE = 'Task title is required.',
  DESCRIPTION = 'Task description is required.',
}

export enum MatchingRuleMessage {
  CHARACTER = 'This character is not allowed.',
  EMAIL = 'Invalid email format.'
}

export const NAME_REG_EXP: RegExp = /^[A-Za-zÀ-ž- _]*[A-Za-zÀ-ž-][A-Za-zÀ-ž- _]*$/;

export const EMAIL_REG_EXP: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
