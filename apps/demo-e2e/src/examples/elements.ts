import { protractor, By, ElementArrayFinder, ElementFinder } from 'protractor';

const KEY = protractor.Key;
const PATH = require('path');

export class Control {
  private readonly _types: string[] = [
    'checkbox', 'combobox', 'datepicker', 'file', 'numberbox', 'radio', 'select', 'switch', 'textarea', 'textbox', 'toggle',
  ];

  constructor(public element: ElementFinder, public theme: string) {}

  findElement(css: string): ElementFinder {
    return this.element.element(By.css(css));
  }

  findElements(css: string): ElementArrayFinder {
    return this.element.all(By.css(css));
  }

  async isPresent(): Promise<boolean> {
    return this.element.isPresent();
  }

  async isEditable(): Promise<boolean> {
    const className = await this.element.getAttribute('class');
    return !(className.includes('hidden') || className.includes('readonly'));
  }

  async getControlType(): Promise<string> {
    const className = await this.element.getAttribute('class');
    return this.getType(className);
  }

  async getInput(): Promise<Input> {
    const controlType = await this.getControlType();
    switch (controlType) {
      case 'file':
        return new Input(controlType, this, this.findElement('input[type="file"]'));
      case 'radio':
        return new Input(controlType, this, this.findElements('input[type="radio"]'));
      case 'select':
        return new Input(controlType, this, this.findElement('select,mat-select'));
      case 'switch':
        return new Input(controlType, this, this.findElements('input[type="checkbox"],mat-slide-toggle'));
      case 'textarea':
        return new Input(controlType, this, this.findElement('textarea'));
      case 'toggle':
        return new Input(controlType, this, this.findElements('input[type="radio"],mat-button-toggle'));
      default:
        return new Input(controlType, this, this.findElement('input'));
    }
  }

  private getType(className: string): string {
    return this._types.find(type => className.includes(type));
  }
}

export class Input {
  readonly inputElement: ElementFinder;

  constructor(public controlType: string, public control: Control, public inputElements: ElementFinder | ElementArrayFinder) {
    this.inputElement = this.inputElements instanceof ElementArrayFinder ? this.inputElements.get(0) : this.inputElements;
  }

  async isPresent(): Promise<boolean> {
    return this.inputElement.isPresent();
  }

  async isEditable(): Promise<boolean> {
    return await this.control.isEditable() && await this.inputElement.isEnabled();
  }

  async getInputType(): Promise<string> {
    return this.inputElement.getAttribute('type');
  }

  async isInputForFalse(): Promise<boolean> {
    const inputId = await this.inputElement.getAttribute('id');
    switch (inputId) {
      case 'input-hidden':
      case 'input-hidden-input':
      case 'input-disabled':
      case 'input-disabled-input':
      case 'input-readonly':
      case 'input-readonly-input':
        return true;
      default:
        return false;
    }
  }

  async getInputValue(): Promise<string | boolean> {
    switch (this.controlType) {
      case 'checkbox':
        return this.inputElement.getAttribute('checked');
      case 'file':
        const element = this.control.findElement('input:not([type="file"])');
        const files = await element.getAttribute('value');
        return files ? files.trim() : files;
      case 'radio':
        const checkedRadio = this.control.findElement('input[type="radio"]:checked');
        return await checkedRadio.isPresent() ? true : false;
      case 'select':
        if (this.control.theme === 'material') {
          const selectedValue = this.control.findElement('span.mat-mdc-select-value-text');
          return await selectedValue.isPresent() ? selectedValue.getText() : null;
        } else {
          const selectedValue = await this.inputElement.getAttribute('value');
          return selectedValue !== 'null' ? selectedValue : null;
        }
      case 'switch':
        const switchToggle = this.control.findElement('input[type="checkbox"]:checked,mat-slide-toggle.mat-mdc-slide-toggle-checked');
        return await switchToggle.isPresent() ? true : false;
      case 'toggle':
        const checkedToggle = this.control.findElement('input[type="radio"]:checked,mat-button-toggle.mat-button-toggle-checked');
        return await checkedToggle.isPresent() ? true : false;
      default:
        const value = await this.inputElement.getAttribute('value');
        return value ? value.trim() : value;
    }
  }

  async checkInputValue(): Promise<boolean> {
    const inputValue = await this.getInputValue();
    return await this.isInputForFalse() ? !inputValue : !!inputValue;
  }

  async editInputValue(): Promise<void> {
    switch (this.controlType) {
      case 'checkbox':
        if (await this.isInputForFalse() && !await this.getInputValue()) {
          await this.inputElement.sendKeys(KEY.SPACE);
        }
        return this.inputElement.sendKeys(KEY.SPACE);
      case 'file':
        const file = PATH.resolve(__dirname, 'file.txt');
        console.log(__dirname);
        console.log(file);
        return this.inputElement.sendKeys(file);
      case 'radio':
        return this.inputElement.sendKeys(KEY.SPACE);
      case 'select':
        const keys = this.control.theme !== 'material'
          ? [ KEY.ARROW_DOWN, KEY.ARROW_DOWN, KEY.ENTER, KEY.ESCAPE ]
          : [ KEY.ARROW_DOWN, KEY.ENTER, KEY.ESCAPE ];
        await this.inputElement.click();
        return this.inputElement.sendKeys(...keys);
      case 'switch':
        if (this.control.theme === 'material') {
          return this.inputElement.click();
        }
        return this.inputElement.sendKeys(KEY.SPACE);
      case 'toggle':
        if (this.control.theme === 'material') {
          return this.inputElement.click();
        }
        return this.inputElement.sendKeys(KEY.SPACE);
      default:
        const inputType = await this.getInputType();
        const value = await this.getEditInputValue(inputType);
        return value ? this.inputElement.sendKeys(value, KEY.TAB) : Promise.resolve();
    }
  }

  private getEditInputValue(type?: string): string | number {
    switch (this.controlType) {
      case 'combobox':
        return 'Value1';
      case 'numberbox':
        return 5;
      case 'datepicker':
        return '01-01-2020';
      case 'textarea':
        return 'Line 1\nLine 2';
      case 'textbox':
        return type === 'email'
          ? 'user@mail.com'
          : type === 'password'
            ? 'Test1234!'
            : 'Value';
      default:
        return null;
    }
  }
}
