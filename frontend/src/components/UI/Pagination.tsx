import { Link } from 'react-router-dom';

const length = 2;
const replace = '...';

interface Props {
  totalPages: number;
  currentPage: number;
  pageChangeHref: string;
}

const Pagination = (props: Props) => {
  const { totalPages, pageChangeHref } = props;
  let { currentPage } = props;
  if (totalPages === 1) return <></>;

  const pages = Array.from({ length: totalPages }, (_, i) =>
    (i + 1).toString()
  );

  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;

  if (currentPage + length < totalPages)
    pages.splice(
      currentPage + length,
      totalPages - currentPage - length - 1,
      replace
    );
  if (currentPage - length > 1)
    pages.splice(1, currentPage - length * 2, replace);

  const linkClass = (page: string) => {
    if (page === replace) return 'btn join-item btn-disabled';
    if (page === currentPage.toString()) return 'btn join-item btn-active';
    return 'btn join-item';
  };

  return (
    <aside className='flex justify-center'>
      <nav className='join'>
        {pages.map((page, index) => (
          <Link
            key={index}
            to={`${pageChangeHref}?page=${page}`}
            class={linkClass(page)}
          >
            {page}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Pagination;
