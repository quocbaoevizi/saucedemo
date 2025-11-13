import { Page, Locator } from '@playwright/test';

export default abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Navigation
    protected async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    protected async goBack(): Promise<void> {
        await this.page.goBack();
    }
    // Element interactions
    protected async click(locator: string | Locator): Promise<void> {
        if (typeof locator === 'string') {
            await this.page.click(locator);
        } else {
            await locator.click();
        }
    }

    protected async type(locator: string | Locator, text: string): Promise<void> {
        if (typeof locator === 'string') {
            await this.page.fill(locator, text);
        } else {
            await locator.fill(text);
        }
    }

    protected async getText(locator: string | Locator): Promise<string> {
        if (typeof locator === 'string') {
            return await this.page.textContent(locator) || '';
        } else {
            return await locator.textContent() || '';
        }
    }

    protected async isVisible(locator: string | Locator): Promise<boolean> {
        try {
            if (typeof locator === 'string') {
                return await this.page.isVisible(locator);
            } else {
                return await locator.isVisible();
            }
        } catch (error) {
            return false;
        }
    }

    // Waits
    protected async waitForElement(locator: string, timeout = 5000): Promise<void> {
        await this.page.waitForSelector(locator, { state: 'visible', timeout });
    }

    protected async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
    }

    // Page actions
    protected async pressKey(key: string): Promise<void> {
        await this.page.keyboard.press(key);
    }

    protected async refreshPage(): Promise<void> {
        await this.page.reload();
    }

    // Page information
    protected async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    protected async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    // Screenshot
    protected async takeScreenshot(path: string): Promise<void> {
        await this.page.screenshot({ path });
    }
}
