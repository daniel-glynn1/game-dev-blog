import fs from 'fs';
import path from 'path';
import Link from 'next/link';

import '../styles/home.css';

export default async function Home() {
  const postsDirectory = path.join(process.cwd(), 'src/posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const match = fileContents.match(/title:\s*(.*)/);
    const title = match ? match[1] : 'Untitled';
    const dateMatch = fileContents.match(/date:\s*(.*)/);
    const date = dateMatch ? dateMatch[1] : 'Unknown date';

    return {
      id: filename.replace(/\.md$/, ''),
      title,
      date,
    };
  });

  return (
    <div className='home'>
      <h2>Unnamed Billiards Roguelite</h2>
      <ul>
        {posts.map(({ id, title, date }) => (
          <li key={id}>
            <Link href={`/posts/${id}`}>
              <div className='postLink'>
                <p>{date}</p>
                <h3>{title}</h3>
              </div>
            </Link>
            
          </li>
        ))}
      </ul>
    </div>
  );
}
