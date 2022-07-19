import { Inject, Injectable } from '@nestjs/common';
import type { LaunchOptions } from 'puppeteer-core';
import puppeteer from 'puppeteer-extra';
import PuppeteerPluginAdBlocker from 'puppeteer-extra-plugin-adblocker';
import PuppeteerPluginStealth from 'puppeteer-extra-plugin-stealth';
import { PUPPETEER_OPTIONS } from './puppeteer.constant';
import { PuppeteerModuleOptions } from './puppeteer.type';

puppeteer.use(PuppeteerPluginStealth());
puppeteer.use(PuppeteerPluginAdBlocker({}));

@Injectable()
export class PuppeteerService {
  constructor(
    @Inject(PUPPETEER_OPTIONS)
    private readonly options: PuppeteerModuleOptions
  ) {}

  async launch(options?: LaunchOptions) {
    return puppeteer.launch({ ...this.options, ...options });
  }
}
