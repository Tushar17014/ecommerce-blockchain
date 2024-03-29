// Components
import Rating from './Rating'

const Section2 = ({ title, items}) => {
    return (
        <div className='cards__section'>
            <h3 id={title}>{title}</h3>

            <hr />

            <div className='cards'>
                {items.map((item) => (
                    <div className='card' key={item.id}>
                        <div className='card__image'>
                            <img src={item.image} alt="Item" />
                        </div>
                        <div className='card__info'>
                            <h4>{item.name}</h4>
                            <Rating value={item.rating} />
                            <p>10 ETH</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Section2;