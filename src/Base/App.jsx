import Account from './Account'
import Enums from './Enums'
import Env from "./Env"
import Globalization from './Globalization'
import Paydar from "./Paydar"
import StringExtensions from "./StringExtensions"
import Url from './Url'

const app = {
    ...Account,
    ...Enums,
    ...Env,
    ...Globalization,
    ...Paydar,
    ...StringExtensions,
    ...Url,
}

export default app
