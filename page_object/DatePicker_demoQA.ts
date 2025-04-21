import { Page, Locator, expect } from "@playwright/test";

export class DatePickerPage {
  readonly page: Page;
  readonly dateInput: Locator;
  readonly yearDropdown: Locator;
  readonly monthDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dateInput = this.page.locator("#dateOfBirthInput");
    this.yearDropdown = this.page.locator(".react-datepicker__year-select");
    this.monthDropdown = this.page.locator(".react-datepicker__month-select");
  }

  async navigate(): Promise<void> {
    await this.page.goto("https://demoqa.com/automation-practice-form");
  }

  async selectDate(day: number, month: string, year: number): Promise<void> {
    await this.dateInput.click();
    await this.yearDropdown.selectOption(String(year));
    await this.monthDropdown.selectOption(month);

    const ariaLabel = this.getAriaLabel(day, month, year);
    await this.page.getByRole("option", { name: ariaLabel }).click();
  }

  async verifyDate(expectedDate: string): Promise<void> {
    const value = await this.dateInput.inputValue();
    expect(value).toBe(expectedDate);
  }

  getOrdinalSuffix(day: number): 'st' | 'nd' | 'rd' | 'th' {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
  getAriaLabel(day: number, month: string, year: number): string {
    const date = new Date(`${month} ${day}, ${year}`);
    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
    const suffix = this.getOrdinalSuffix(day);
    return `Choose ${weekday}, ${month} ${day}${suffix}, ${year}`;
  }
}
