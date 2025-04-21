// pages/DatePicker.ts
import { HomePage } from "./HomePage";
import { Locator, Page, expect } from "@playwright/test";
import _ from "lodash";

export class DatePicker extends HomePage {
  constructor(page: Page) {
    super(page);
  }

  get header() {
    return "h1";
  }

  get fromInput() {
    return "#from";
  }

  //   fromInput:string = () => "#from";
  get toInput() {
    return "#to";
  }
  get monthOfTheYear() {
    return '[class="ui-datepicker-month"]';
  }
  get prevYear() {
    return '[title="Prev"]';
  }
  get nextYear() {
    return '[title="Next"]';
  }
  get getDate() {
    return ".ui-state-default";
  }
  get dateFromComponent() {
    return "#ui-datepicker-div";
  }
  get dateOfTheYear() {
    return '[class="ui-datepicker-year"]';
  }
  get dateOfTheMonth() {
    return '[class="ui-datepicker-month"]';
  }

  public async verifyHeader() {
    const header: Locator = this.page.locator(this.header);
    await expect(header).toContainText("Date Picker");
  }
  randomYearNumber = _.random(1, 50);
  date = _.random(1, 30);
  public async dateFromToday() {
    const obj = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    await this.page.locator(this.fromInput).click();
    console.log(this.randomYearNumber);
    for (let i = 0; i < this.randomYearNumber; i++) {
      await this.page.locator(this.prevYear).click();
    }
    let year = await this.page.locator(this.dateOfTheYear).textContent();
    let month = await this.page
      .locator(this.dateOfTheMonth)
      .locator('[selected="selected"]')
      .textContent();
    console.log(year);
    console.log(month);
    console.log(this.date);
    await this.page
      .locator(this.dateFromComponent)
      .getByRole("link", { name: this.date.toString(), exact: true })
      .click();
    const formattedMonth = obj[month! as keyof typeof obj];
    const paddedDay = String(this.date).padStart(2, "0");

    expect(await this.page.locator(this.fromInput).inputValue()).toBe(
      `${formattedMonth}/${paddedDay}/${year}`
    ); //mm/dd/yyyy
  }

  async navigateToDatePicker(): Promise<void> {
    await this.goto("/jquery-date-picker-demo");
  }
  //homeWork
  public async dateFromOrTo(selector: string): Promise<void> {
    const monthMap: Record<string, string> = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    // 1. Click the input to open the date picker
    await this.page.locator(selector).click();

    // 2. Click "Prev" button N times to go back N years
    for (let i = 0; i < this.randomYearNumber; i++) {
      await this.page.locator(this.prevYear).click();
    }

    // 3. Get the displayed year and month
    const year = await this.page.locator(this.dateOfTheYear).textContent();
    const month = await this.page
      .locator(this.dateOfTheMonth)
      .locator('[selected="selected"]')
      .textContent();

    // 4. Select the random day
    await this.page
      .locator(this.dateFromComponent)
      .getByRole("link", { name: this.date.toString(), exact: true })
      .click();

    // 5. Format date as MM/DD/YYYY
    const formattedMonth = monthMap[month!.trim() as keyof typeof monthMap];
    const paddedDay = String(this.date).padStart(2, "0");
    const expectedDate = `${formattedMonth}/${paddedDay}/${year}`;

    // 6. Assert input value is correct
    const inputValue = await this.page.locator(selector).inputValue();
    expect(inputValue).toBe(expectedDate);
  }
}
