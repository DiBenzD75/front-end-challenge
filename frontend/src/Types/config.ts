export const DEVICE_DATA_PATH = './Data/deviceData.json'
export const USERS_DATA_PATH = './Data/users.json'

interface DeviceDataTypes {
  id: number
  type: string
  price: string
  color: string
  location: string
  last_used: string
  device_health: string
}

interface UserTypes {
  name: string
  email: string
  password: string
}

export type { DeviceDataTypes, UserTypes }

export interface FormData {
  [key: string]: string
}

export const formConfig = [
  {
    name: 'name',
    type: 'text',
    validation: {
      /**
       * - required
       * - at least 2 characters
       */
      required: true,
      minLength: 2,
    },
  },
  {
    name: 'email',
    type: 'email',
    validation: {
      required: true,
      pattern:
        /**
         * required
         * - simple email validation
         */
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
  },
  {
    name: 'password',
    type: 'password',
    validation: {
      required: true,
      minLength: 8,
      pattern:
        /**
         * - required
         * - at least 8 characters
         * - at least one uppercase letter
         * - at least one special character
         * - at least one number
         */
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
  },
]
