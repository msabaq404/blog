A modern blog template powered by Svelte, Astro, Sanity CMS, GitHub Actions, and Netlify functions. Fork this repository and follow the simple setup steps below to have your blog running in minutes!

## 🚀 Quick Start

Note: You will be required to notedown many tokens, so have your text editor ready and paste those tokens as those will be required later.
In total, you will need these 7 tokens:
`SANITY_PROJECT_ID`
`SANITY_AUTH_TOKEN`
`SANITY_TOKEN`
`HOST`
`NETLIFY_SITE_ID`
`NETLIFY_SITE_TOKEN`
`COMMENT_URL`

### Step 1: Fork the Repository
Click the "Fork" button at the top right of this repository

### Step 2: Set up Sanity CMS
1. Go to [sanity.io](https://sanity.io) and create an account or sign in
2. Click on "Start Building" and create a new project
3. Note down the following values:
   - **Project ID** **`[SANITY_PROJECT_ID]`** (you'll see this in your project dashboard)
   - Go to **API** section in your Sanity project dashboard
   - Scroll down to the Tokens section
   - Click on 'Add Token' and give it any name and select the "Deploy Studio" permission, and then copy the token. This will be your **`SANITY_AUTH_TOKEN`**
   - Now, create another token. But this time, choose the editor permission and the name doesnt matter so you can type anything in the name field. This will be your **`SANITY_TOKEN`**

### Step 3: Set up Sanity Studio (Content Dashboard)
Sanity Studio is the Content Dashboard which you will use to write and publish your blogs. It can be accessed at https://your-desired-name.sanity.studio. The name will be chosen by you but it should be available.

1. Choose your desired studio name (e.g., `myblog`)
2. Check availability by visiting: `https://myblog.sanity.studio` in your browser. If it's available you will get "Studio Not Found".
3. If available, note this as your **HOST** value: `myblog`. Yes, this is one of those values that you need to note down and only copy the name, not the entire URL.
4. This will be your dashboard URL where you'll create and manage blog posts

### Step 4: Configure Sanity Webhooks
1. Create a GitHub Personal Access Token (PAT) by visiting [Create PAT](https://github.com/settings/personal-access-tokens)
2. Create a new token, and select the repository of your blog and select "Actions", "Contents", and "Webhooks" in repository permissions.
3. Choose 'No Expiration' or a very long period as the site wont update after the token expires.
4. Copy the token and store it safely somewhere for now. If lost, you can always recreate a new token.
5. Now, in your Sanity project dashboard, go to the **API** section
6. Scroll down to **Webhooks**
7. Create a new webhook with the following settings:
   - **URL**: `https://api.github.com/repos/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/dispatches`
   - **Trigger on**: Check both "Create" and "Update"
   - **HTTP method**: POST
   - In the **Projections field**, just paste this: `{ "event_type": "sanity-content-change" }`
8. In the HTTP Headers, paste `Authorization` in the Name field and `Bearer your_github_pat_token` in the Value field. Don't forget to write Bearer before the PAT token. Don't mess with other fields and checkboxes.
8. This will trigger GitHub Actions when you create or update content

### Step 5: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "Create new project" and "Import from existing project".
3. Choose GitHub and select your forked repository
4. **Important**: Skip/clear the build command field (leave it empty)
5. Click "Deploy site"
6. Once deployed, note down:
   - **PROJECT ID (also known as SITE ID)** (found in Project Configuration) - Note it down, this becomes your **`NETLIFY_SITE_ID`**
   - **Site URL** (e.g., `amazing-blog-123456.netlify.app`) -  Note it down, this becomes your **`COMMENT_URL`**
7. Generate a **NETLIFY_AUTH_TOKEN**:
   - Visit this [Create AUTH Token](https://app.netlify.com/user/applications) **OR** Go to User settings > Applications > Personal access tokens
   - Click "New access token" under "Personal Access Token"
   - Give it a name and copy the token. This will be your **`NETLIFY_AUTH_TOKEN`**

### Step 6: Add GitHub Secrets
Go to your forked repository on GitHub:
1. Click on **Settings** tab
2. Go to **Secrets and variables** > **Actions**
3. Click **New repository secret** and add each of the following:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `SANITY_PROJECT_ID` | Your Sanity project ID | From Step 2 |
| `SANITY_AUTH_TOKEN` | Your Sanity auth token | From Step 2 |
| `SANITY_TOKEN` | Your Sanity API token | From Step 2 |
| `HOST` | yourdesiredname.sanity.studio | From Step 3 |
| `NETLIFY_SITE_ID` | Your Netlify site ID | From Step 5 |
| `NETLIFY_AUTH_TOKEN` | Your Netlify auth token | From Step 5 |
| `COMMENT_URL` | Your Netlify site name | From Step 5 |

4. Now got to the **Actions** tab of the GitHub repo and run the worflows in order:

    1. Deploy Sanity Studio (on demand)
    2. Deploy Netlify Functions
    3. Then, write a blog post on Sanity Studio and wait for a minute. After a while, you can check the blog at `https://your_user_name.github.io/blog`

## 🎉 You're Done!

Your blog is now set up! Here's what you can do:

- **Create content**: Visit `https://HOST` (your Sanity Studio URL) to create and manage blog posts
- **View your blog**: Your live blog will be available at your Netlify URL
- **Automatic updates**: When you create or update posts in Sanity, your blog will automatically rebuild and deploy

## 📝 Managing Your Blog

### Creating Posts
1. Go to your Sanity Studio URL (`https://yourdesiredname.sanity.studio`)
2. Sign in with your Sanity account
3. Create new posts, add images, and manage your content
4. Publish your posts - they'll automatically appear on your live site!

### Customizing Your Blog
- Edit the configuration files in your repository
- Modify styling and layout as needed
- Push changes to GitHub - they'll automatically deploy to Netlify

## 🔧 Troubleshooting

### Common Issues
- **Sanity Studio not loading**: Double-check your HOST value and ensure the studio name is available
- **Build failures**: Verify all 7 GitHub secrets are correctly set
- **Webhook not working**: Ensure the webhook URL matches your repository and the triggers are set to "Create" and "Update"

### Need Help?
- Check the Issues section of this repository
- Refer to [Sanity documentation](https://www.sanity.io/docs)
- Check [Netlify documentation](https://docs.netlify.com)

## 📋 Summary of Required Secrets

Make sure you have all 7 secrets configured in your GitHub repository:

1. `SANITY_PROJECT_ID` - Sanity project ID
2. `SANITY_AUTH_TOKEN` - Sanity authentication token
3. `SANITY_TOKEN` - Sanity API token
4. `HOST` - Your Sanity Studio URL
5. `NETLIFY_SITE_ID` - Netlify site ID
6. `NETLIFY_AUTH_TOKEN` - Netlify authentication token
7. `COMMENT_URL` - Netlify site name

Happy blogging! 🚀