# Deployment

This portfolio is hosted on Vercel at https://saloniporwal.com.

Production deploys automatically from the `main` branch. GitHub Pages is not used.

## Commit identity

For this private repository on Vercel Hobby, commits that trigger production deployment must be authored by the GitHub account connected to the Vercel project owner (`Sujalshah46`). Commits from other accounts can be blocked before the build starts.

Use the connected owner account when publishing changes from development tools. Preserve contributor attribution when reviewing and integrating their changes. Supporting additional deployment authors for a private repository requires an appropriate Vercel plan and project access.

## Verify a release

Check the Vercel project's Production Deployment: its status should be Ready and its source commit should match the latest intended commit on `main`. Then verify the changed page at the production domain.

Old failed commit checks remain in GitHub history after later releases succeed.
