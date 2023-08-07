import { ConfigurableModuleBuilder } from "@nestjs/common";

export const { 
    ConfigurableModuleClass,
    MODULE_OPTIONS_TOKEN : HTTP_MODULE_OPTIONS
 } = new ConfigurableModuleBuilder<{baseUrl? : string}
 >()
//  .setClassMethodName('forRoot')
//  .setFactoryMethodName('resolve')
 .build();