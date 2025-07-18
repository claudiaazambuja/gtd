// src/i18n/json.loader.ts
import { Injectable } from '@nestjs/common';
import { I18nLoader, I18nTranslation } from 'nestjs-i18n';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class I18nJsonLoader implements I18nLoader {
  constructor(private options: { path: string }) {}

  async languages(): Promise<string[]> {
    return fs.readdirSync(this.options.path);
  }

  async load(): Promise<I18nTranslation> {
    const translations: I18nTranslation = {};
    const langs = await this.languages();

    for (const lang of langs) {
      const langPath = path.join(this.options.path, lang);
      const files = fs.readdirSync(langPath);

      for (const file of files) {
        if (!file.endsWith('.json')) continue;

        const filePath = path.join(langPath, file);
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const namespace = path.basename(file, '.json');

        if (!translations[lang]) translations[lang] = {};
        translations[lang][namespace] = content;
      }
    }

    return translations;
  }
}
