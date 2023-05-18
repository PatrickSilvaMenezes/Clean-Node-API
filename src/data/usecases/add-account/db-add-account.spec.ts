import { DbAddAccount } from "./db-add-account";

describe('DbAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    class EncrypterStub {
      async encrypt(value: string): Promise<string> {
        return new Promise<string>((resolve) => resolve('hashed_password'));
      }
    }

    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid name',
      email: 'valid email',
      password: 'valid password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid password')
  })
})