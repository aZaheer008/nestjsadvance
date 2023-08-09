import { ContextId, ContextIdFactory, ContextIdResolver, ContextIdResolverFn, ContextIdStrategy, HostComponentInfo } from "@nestjs/core";
import { pick } from "accept-language-parser";
import { Request } from 'express';
import { I18nService } from "src/i18n/i18n.service";

export class AggregateByLocaleContextIdStrategy implements ContextIdStrategy {
    // A collection of context identifiers representing sperate DI sub-trees per locale
    private readonly locales = new Map<string, ContextId>();

    attach(contextId: ContextId, request: Request): ContextIdResolverFn | ContextIdResolver {
        const localeCode = pick(I18nService.supportedLanguages, request.headers['accept-language']) ?? I18nService.defaultLanguage;
        if (!localeCode) {
            // OR log error depending on what we want to accomplish
            return () => contextId;
        }
        let localeSubTreeId : ContextId;
        if (this.locales.has(localeCode)) {
            localeSubTreeId = this.locales.get(localeCode);
        } else {
            // Construct a new context Id
            localeSubTreeId = ContextIdFactory.create();
            this.locales.set(localeCode, localeSubTreeId);
        }
        return {
            payload : { localeCode },
            resolve: (info : HostComponentInfo) =>
                info.isTreeDurable ? localeSubTreeId : contextId
        }
    }

}