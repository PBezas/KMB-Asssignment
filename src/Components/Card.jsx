

export default function Card({ urlToImage, title, content }) {
  return (
    <article className="article">
      <img src={urlToImage} alt="article img" className="articleImg" />
      <div className="articleBody">
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </article>
  );
}
