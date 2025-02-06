export const plans = [
    {
        link: process.env.NODE_ENV === 'development' ? 'https://buy.stripe.com/fZecNodqxbxE8rS6oo' : 'https://buy.stripe.com/fZecNodqxbxE8rS6oo',
        priceId: process.env.NODE_ENV === 'development' ? 'prod_RitpU3LbKauAxv' : 'prod_RitpU3LbKauAxv',
        price: 29,
        duration: '/lifetime'
    }
];