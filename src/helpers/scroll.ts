const scroll = () => {
  const header = document.querySelector('#header');

  if (window.scrollY >= 65) {
    header?.classList.add('is-floating');

    return;
  }

  header?.classList.remove('is-floating');
}

export default scroll;
