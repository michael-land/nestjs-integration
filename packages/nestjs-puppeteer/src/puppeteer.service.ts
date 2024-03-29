import { Inject, Injectable } from '@nestjs/common';
import type { PuppeteerLaunchOptions } from 'puppeteer-core';
import puppeteer from 'puppeteer-extra';
import PuppeteerPluginAdBlocker from 'puppeteer-extra-plugin-adblocker';
import PuppeteerPluginStealth from 'puppeteer-extra-plugin-stealth';
import { PUPPETEER_OPTIONS } from './puppeteer.constant.js';
import type { PuppeteerModuleOptions } from './puppeteer.type.js';

puppeteer.use(PuppeteerPluginStealth());
puppeteer.use(PuppeteerPluginAdBlocker({}));

@Injectable()
export class PuppeteerService {
  constructor(
    @Inject(PUPPETEER_OPTIONS)
    private readonly options: PuppeteerModuleOptions
  ) {}

  async launch(options?: PuppeteerLaunchOptions) {
    return puppeteer.launch({ ...this.options, ...options });
  }
}
