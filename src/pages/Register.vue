<template>
  <div class="grid h-screen mx-auto place-items-center max-w-7xl px-content">
    <div class="w-full max-w-lg space-y-4">
      <div class="flex justify-center">
        <img
          class="w-20 h-20 rounded-2xl"
          src="/src/assets/discord.png"
          alt="logo"
        />
      </div>
      <div class="pt-4 pb-8 space-y-4 rounded-md px-content bg-secondary">
        <h2 class="text-2xl font-semibold text-center">Welcome to Discord</h2>
        <div>
          <Form
            v-slot="{ errors, isSubmitting }"
            :validation-schema="RegisterSchema"
            class="space-y-4"
            @submit="submit"
          >
            <div class="flex flex-col space-y-1.5">
              <label for="email" class="text-sm uppercase">Email</label>
              <Field
                id="email"
                name="email"
                type="email"
                class="px-4 py-2 border border-black rounded bg-secondary-alt"
                :class="[errors.email && 'border-red-400']"
              />
              <ErrorMessage class="text-red-400" name="email" />
            </div>
            <div class="flex flex-col space-y-1.5">
              <label for="username" class="text-sm uppercase">Username</label>
              <Field
                id="username"
                name="username"
                type="text"
                class="px-4 py-2 border border-black rounded bg-secondary-alt"
                :class="[errors.username && 'border-red-400']"
              />
              <ErrorMessage class="text-red-400" name="username" />
            </div>
            <div class="flex flex-col space-y-1.5">
              <label for="password" class="text-sm uppercase">Password</label>
              <Field
                id="password"
                name="password"
                type="password"
                class="px-4 py-2 border border-black rounded bg-secondary-alt"
                :class="[errors.password && 'border-red-400']"
              />
              <ErrorMessage class="text-red-400" name="password" />
            </div>
            <b-button
              class="block w-full py-2 font-semibold text-white rounded  bg-purple"
              :loading="isSubmitting"
              type="submit"
            >
              Register
            </b-button>
            <p>
              Already have an account?
              <router-link to="/login" class="text-purple">
                Sign In
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
import { RegisterSchema } from '@/validation/auth'
import { register } from '@/api/handler/auth'
import { toErrorMap } from '@/helpers'
import { useUser } from '@/stores/user'

export default defineComponent({
  name: 'PageRegister',
  setup() {
    const userStore = useUser()
    const router = useRouter()

    async function submit(values: any, { setErrors }: Record<string, any>) {
      try {
        const { data } = await register(values)
        if (data) {
          userStore.setUser(data)
          router.push('/channels/me')
        }
      } catch (err: any) {
        if (err?.response?.data?.errors) {
          setErrors(toErrorMap(err))
        } else {
          console.log('something wrong')
        }
      }
    }

    return { submit, RegisterSchema }
  },
})
</script>

<style></style>
