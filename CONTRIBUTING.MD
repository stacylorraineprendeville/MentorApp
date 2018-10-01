# Contributing

We love contributions from everyone.
By participating in this project,
you agree to abide by the Contributor Covenant [code of conduct].

  [code of conduct]: https://www.contributor-covenant.org/version/1/4/code-of-conduct.html

We expect everyone to follow the code of conduct
anywhere in Fundacion Paraguaya's project codebases,
issue trackers, chatrooms, and mailing lists.

## The Contribution Process

It is really important for us that the core team and the community are aligned in the development process. Here is a short overview of the contribution process which will help the community help us in developing the app.

Since we are rebuilding the application, we are still in the stage of setting the foundation of the app. This means that at this point in time, the core team will be defining the issues that the community should work on. We believe that this will also give the community a good onboarding process to our application.

The core team will try to keep issues independent and self contained so that the community can treat/work on each individual issue without concern of it affecting others or other parts of the system. This also gives you the freedom to work on what you want without being too concerned about possible side effects.

This may however not be always possible as some things are just too interdependent. If this is the case, we will inform you about it in the issue itself.

1. The core team will create issues issues labeled with `help needed` to identify things where the community can contribute. An issue labeled with `good first issue` is where we thing a new contributor can assist us in (an issue that is not too complex and would provide an on boarding into our system).

An example of such an issue is Issue #1

2. Fork the repo

3. To ensure consistency and that the dev team has an overview of what the community is working on, if you want to work on an issue please create a new branch with the following format


```
#for enhancement
new branch feature/issue-<#>

# for bug
new branch bug/issue-<#>
```

For example, in the case of issue one above, i will create the following branch:

```
new branch feature/issue-1
```

4. Push to your fork. Write a [good commit message][commit].

  [commit]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html


5. Submit a Pull Request. The pull request should explain what you did. Please make your pull requests **assuming that it will be merged to master**. This means that we **require** that you create tests for your code.

Others will give constructive feedback.
This is a time for discussion and improvements,
and making the necessary changes will be required before we can
merge the contribution.

**DO MAKE SURE ALL THE TESTS PASS BEFORE YOU MAKE A PR**

*Also, please do not create pull requests that are unreasonably large (huge amount of commits) as we will not merge them (due to the risk of it breaking something).*
