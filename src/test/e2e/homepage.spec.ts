import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load and display main sections', async ({ page }) => {
    await page.goto('/');

    // Check hero section
    await expect(page.locator('h1')).toContainText('Welcome to Your Professional Presentation');

    // Check navigation
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('a[href="#about"]')).toBeVisible();
    await expect(page.locator('a[href="#gallery"]')).toBeVisible();
    await expect(page.locator('a[href="#contact"]')).toBeVisible();
  });

  test('should navigate to sections when clicking links', async ({ page }) => {
    await page.goto('/');

    // Click gallery link
    await page.locator('a[href="#gallery"]').first().click();
    await expect(page.locator('h2')).toContainText('Our Gallery');
  });

  test('should display gallery items', async ({ page }) => {
    await page.goto('/');

    // Scroll to gallery section
    await page.locator('#gallery').scrollIntoViewIfNeeded();

    // Check gallery items are displayed
    const galleryItems = page.locator('[class*="grid"] > div');
    await expect(galleryItems.first()).toBeVisible();
  });

  test('should have functional contact form', async ({ page }) => {
    await page.goto('/');

    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Fill form
    await page.locator('input[placeholder="Your Name"]').fill('Test User');
    await page.locator('input[placeholder="Your Email"]').fill('test@example.com');
    await page.locator('input[placeholder="Subject"]').fill('Test Subject');
    await page.locator('textarea[placeholder="Your Message"]').fill('This is a test message');

    // Check form is filled
    await expect(page.locator('input[placeholder="Your Name"]')).toHaveValue('Test User');
  });

  test('should have admin link in navigation', async ({ page }) => {
    await page.goto('/');

    const adminLink = page.locator('a[href="/admin"]');
    await expect(adminLink).toBeVisible();
    await expect(adminLink).toContainText('Admin');
  });
});

