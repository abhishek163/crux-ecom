export function NavUserName({firstName,lastName}) {
    return (
        <div className="nav__avatar">
          <span className="nav__avatar-name">
            {`${firstName} ${lastName}`}
          </span>
        </div>
    );
  }