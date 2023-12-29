import { VueWrapper } from '@vue/test-utils'
import { mount } from 'cypress/vue'
import { ComponentPublicInstance } from 'vue'
import { Router } from 'vue-router'

type MountParams = Parameters<typeof mount>
type Props = MountParams[1]['props']
type OptionsParam = MountParams[1] & { router?: Router } & Props

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Helper mount function for Vue Components
       * @param component Vue Component or JSX Element to mount
       * @param options Options passed to Vue Test Utils
       */
      mount(component: any, options?: OptionsParam): Chainable<any>
      vue(): Chainable<VueWrapper<ComponentPublicInstance>>
      emitted<
        T extends new (...args: any) => any,
        E extends Events<InstanceType<T>>,
        K extends keyof E
      >(
        selector: T,
        event?: K
      ): Chainable<E[K]>
    }
  }
}
/*
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<any, {}, any>
  export default component
}
*/
