<template>
  <div class="grid h-screen mx-auto place-items-center max-w-7xl px-content">
    <div class="w-full max-w-lg space-y-4">
      <div class="flex justify-center">
        <img
          class="w-20 h-20"
          src="/src/assets/logo.png"
          alt="logo"
        >
      </div>
      <div class="px-content pt-4 pb-8 space-y-4 bg-[#36393e] rounded-md">
        <h2 class="text-2xl font-semibold text-center">
          Welcome Back
        </h2>
        <div>
          <Form
            v-slot="{errors, isSubmitting}"
            :validation-schema="LoginSchema"
            class="space-y-4"
            @submit="submit"
          >
            <div class="flex flex-col space-y-1.5">
              <label
                for="email"
                class="text-sm uppercase"
              >Email</label>
              <Field
                id="email"
                name="email"
                type="email"
                class="px-4 py-2 bg-[#303338] border border-black rounded"
                :class="[errors.email && 'border-red-400']"
              />
              <ErrorMessage
                class="text-red-400"
                name="email"
              />
            </div>
            <div class="flex flex-col space-y-1.5">
              <label
                for="password"
                class="text-sm uppercase"
              >Password</label>
              <Field
                id="password"
                name="password"
                type="password"
                class="px-4 py-2 bg-[#303338] border border-black rounded"
                :class="[errors.password && 'border-red-400']"
              />
              <ErrorMessage
                class="text-red-400"
                name="password"
              />
            </div>
            <router-link
              class="inline-block text-purple"
              to="/"
            >
              Forgot Password?
            </router-link>
            <button
              class="block w-full py-2 font-semibold rounded bg-purple"
              :disabled="isSubmitting"
              type="submit"
            >
              Login
            </button>
            <p>
              Don't have an account yet?
              <router-link
                to="/register"
                class="text-purple"
              >
                Sign Up
              </router-link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { LoginSchema } from '@/validation/auth'
import { login } from '@/api/handler/auth'
import { toErrorMap } from '@/helpers'
import { useUser } from '@/stores/user'

export default defineComponent({
  name: 'PageLogin',
  components: { Form, Field, ErrorMessage },
  setup() {
    const userStore = useUser()
    const router = useRouter()

    async function submit(values: any, { setErrors }: Record<string, any>) {
      try {
        const { data } = await login(values)
        if (data) {
          userStore.setUser(data)
          router.push('/channels/me')
        }
      } catch (err: any) {
        if (err?.response?.status === 401) {
          setErrors({ password: 'Invalid credentials' })
        } else if (err?.response?.status === 404) {
          setErrors({ password: 'No user found' })
        } else {
          setErrors(toErrorMap(err))
        }
      }
    }

    return { submit, LoginSchema }
  },
})
</script>

<style>
</style>
