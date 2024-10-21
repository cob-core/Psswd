# Psswd
### Memorable passwords, generated locally. Temporary passwords perfect for the end-user.
![image](https://github.com/user-attachments/assets/0bb8db9a-88ba-44cf-a7ea-57381ec31c37)

## How to Use
Visit https://psswd.org, click 'Generate', voilà!

## How it's Made
The site is built on the simple foundations of HTML, CSS, and JavaScript. The site provides all necessary data to your browser, and then all of the password generation is done locally. Nothing is sent back to psswd.org.

## How is that Secure?
Well, to be honest, it's only as secure as your computer is. Other sites may send hashes and encrypted data back to their servers to serve passwords but if they are generating memorable passwords then nothing changes. With enough time, anyone can generate a list of potential words that those generators spit out, work out the format (how it adds symbols, numbers, etc.), and bruteforce those passwords.
These should not be used as permanent passwords for important accounts, as best practice you should have completely random passwords for each account, stored in a password manager.
Though if these are used, then who would know they came from here? Who would know you didn't tamper with the site to adjust the word generation? We don't use existing online dictionaries or wordlists, the wordlists are generated using AI, and may change in the future.

## Tamper with the Site?
Because of all of the data necessary is served to the browser, the site can be adjusted locally as well (if you know how). Simply change the relevant files and whole new passwords will be generated. Inject your own code if you want, nothing comes back to the servers so it's all on your own device.

## Then who is it for?
This is perfect for those in IT positions or MSPs who need temporary passwords for end-users who need their password resetting, or for the casual user who is enforcing MFA alongside their accounts. If you use a long enough password, then pop it in your password manager, then it is easy and secure.

## Help! I found an issue/security vulnerability.
Please report all issues in the 'Issues' tab. If you have a suggested feature, you can add it there too, though I will also be adding a feature to the site to allow people to add suggestions.