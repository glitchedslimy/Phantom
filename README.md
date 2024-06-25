# ✨ Phantom ✨

<center>Phantom is a <i>smart, quick, minimal and modern</i> extension/theme for VSCode.</center>

> [!CAUTION]
> **Phantom** is still in a `experimental` phase. This means is not 100% complete. Should be stable enought to work with, but there are a lot of things missing that are being worked on.

_Also sorry, I am still working taking screenshots, videos and making the design of the extension, it will be soon..._

### Why Phantom?

**Phantom comes with a bunch of features _out of the box_:**

- **GFM by default**, Github Flavoured Markdown is supported by default with Phantom, so you don't need to use external packages to be able to use it.

- **Minimal**, the theme aims to be minimal, hence I'll try to put it's size as minimal as possible.

- **Quick**, the idea behind phantom is to have an "extension pack" but in 1 extension, but as well, being quick to load.

- **Modern**, Phantom uses modern development standards to improve it's quality.

- **Open for the community**, Phantom is always open to changes from the community, this means as well, that this extension will never be sold to any external source out of my control.

- **Smart**, Phantom can adapt, it will choose things for you depending on what you select, for example, the accent color.

- **Custom Accents**, having to choose only one color is boring, so... why not select any color that **I want**? With Phantom that's possible, you can change it's accent color the way you want.

### Requirements
**Phantom aims to have the features _out of the box_**, so no external dependencies should be used with Phantom.
> [!NOTE]
> If there's any external dependency needed and I didn't said anything related, please, let me know to fix it as quick as possible.

### I don't trust this extension
That's honestly fair with all the extension concerns there is with VSCode lately, being _not sandboxed_ extensions.

And that's why I decided to be transparent with the community.

_Phantom_, uses a few lines of code to read from the filesystem with `fs`. But only files related to the extension (you can check all the code inside the src folder if you want to).

I am not aiming to do malicious intents with the people that uses my extension.

Feel free to:
- Scan the code
- See the code
- Make Virus Analysis of the code and extension
- Check the whole extension to see if something about security can be improved

I am here to provide a secure experience for everyone, so let me know if there's any issue in terms of security opening an issue.

> [!WARNING]
> You may get some kind of "Virus Advice" and it's probably because the extension uses `fs` to access files on the system, for example, the `Phantom.json` _(which is inside the extension)_ file to update the theme when you update the accent color.

### Extension Settings
For now, Phantom only has 1 setting, which is the accent color:

- `phantom.accentColor`: Changes the accent color of the components inside the theme using hex format. Ex. `#8517D6`.

### Known issues

There are some known issues that are being worked on currently.

- Checkbox color doesn't adequate with the accent color in markdown previews.
- Some colors are not changed, they are being changed.
- Not enough accessibility on the theme, I am working on doing a version with hight accesibility for people that needs it.

### Release notes
You can check the [Changelog file](./CHANGELOG.md) to see the current version and features added, removed and changed each version from the start of the project.

If not, you can view it in VSCode with:
1. `Ctrl + shift + P` to open the command Palette.
2. Search for `Phantom` and select `Phantom: Show Changelog`
3. A new webview should open for you with all the changes of the changelog inside VSCode.

### Contributions
>[!IMPORTANT]
> I do not search for people to collaborate on the project, but feel free to make a fork and Pull Requests to the project to improve it as it's Open Source, I'll review them and add them if they make sense.

### License
>[!IMPORTANT]
> The `License` is copyleft, you can use it for commercial use, modify the code, distribute the code, you can use the code, and you can use it privatly **BUT**, you need to _Share the code with the same license and copyright_, _Can't make the project you do Closed Source_, _SAME LICENSE IN YOUR PROJECT_ (GNU GPL v3.0).

The LICENSE used in the project is the `GNU GPL-v3.0 License` you can read it on: [LICENSE](./LICENSE).