const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const articlesPost = path.resolve(`./src/templates/articles-post.js`)
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const skillsPost = path.resolve(`./src/templates/skills-post.js`)
  const projectsPost = path.resolve(`./src/templates/projects-post.js`)
  return graphql(
    `
      {
        posts: allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { fileAbsolutePath: { glob: "**/content/blog/*.md" } }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
        articles: allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { fileAbsolutePath: { glob: "**/content/articles/*.md" } }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
        skills: allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { fileAbsolutePath: { glob: "**/content/skills/*.md" } }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                process
              }
            }
          }
        }
        projects: allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { fileAbsolutePath: { glob: "**/content/projects/*.md" } }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const articles = result.data.articles.edges
    const posts = result.data.posts.edges
    const skills = result.data.skills.edges
    const projects = result.data.projects.edges

    articles.forEach((article, index) => {
      const previous = index === articles.length - 1 ? null : articles[index + 1].node
      const next = index === 0 ? null : articles[index - 1].node

      createPage({
        path: `articles${article.node.fields.slug}`,
        component: articlesPost,
        context: {
          slug: article.node.fields.slug,
          previous,
          next,
        },
      })
    });

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: `blog${post.node.fields.slug}`,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    });

    skills.forEach((skill, index) => {
      const previous = index === skills.length - 1 ? null : skills[index + 1].node
      const next = index === 0 ? null : skills[index - 1].node

      createPage({
        path: `skills${skill.node.fields.slug}`,
        component: skillsPost,
        context: {
          slug: skill.node.fields.slug,
          previous,
          next,
        },
      })
    });

    projects.forEach((project, index) => {
      const previous = index === projects.length - 1 ? null : projects[index + 1].node
      const next = index === 0 ? null : projects[index - 1].node

      createPage({
        path: `projects${project.node.fields.slug}`,
        component: projectsPost,
        context: {
          slug: project.node.fields.slug,
          previous,
          next,
        },
      })
    });

    return null
  })

}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
