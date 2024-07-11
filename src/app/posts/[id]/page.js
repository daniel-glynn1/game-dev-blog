import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

import '../../../styles/post.css';

export default async function Post({ params }) {
  const { id } = params;
  const postsDirectory = path.join(process.cwd(), 'src/posts');
  const filePath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const match = fileContents.match(/title:\s*(.*)/);
  const title = match ? match[1] : 'Untitled';
  const dateMatch = fileContents.match(/date:\s*(.*)/);
  const date = dateMatch ? dateMatch[1] : 'Unknown date';
  const content = fileContents.split('---\n').slice(2).join('---\n');

  return (
    <div>
      <Link href="/" className="backButton">
        Back
      </Link>
      <article>
        <h1>{title}</h1>
        <p className='dateText'>{date}</p>
        <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
      </article>
      
    </div>
  );
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'src/posts');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    id: filename.replace(/\.md$/, ''),
  }));
}
