import User from '#models/user'
import UserProvider from '#providers/user_provider'
import { loginValidator } from '#validators/login_user'
import { registerValidator } from '#validators/register_user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthController {
    constructor(protected userProvider: UserProvider) { }
    public async register({ request, response }: HttpContext) {
        const data = request.all()
        const validate = await registerValidator.validate(data);
        await this.userProvider.create(validate);
        return response.safeStatus(201).json({ message: "User created!" })
    }

    public async login({ request, auth, response }: HttpContext) {
        const data = request.all();
        console.log(data)
        const validate = await loginValidator.validate(data)
        console.log(validate)
        const { email, password } = validate;
        const user = await User.verifyCredentials(email, password);
        await auth.use('web').login(user);
        await auth.authenticate();
        console.log(auth.user)
        return response.safeStatus(200).json({ message: "User logged in!" })
    }

    public async me({ auth }: HttpContext) {
        return auth.user
    }
}

/*
s%3AeyJtZXNzYWdlIjoiYW4zMXJsNXNkbDc5NGVscTVhN3c1bzNkIiwicHVycG9zZSI6ImFkb25pcy1zZXNzaW9uIn0.PNrb1Fl2hgVSeHL3JxCNznR9-3v1558lAWBNSsWzOCk	

*/