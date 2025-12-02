import { motion } from 'framer-motion';
import { Product } from '@/types/shop';
import { HeroSection } from './sections/HeroSection';
import { TrustSection } from './sections/TrustSection';
import { CategoriesSection } from './sections/CategoriesSection';
import { ValuesSection } from './sections/ValuesSection';
import { ProductsSection } from './sections/ProductsSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { NewsletterSection } from './sections/NewsletterSection';

interface LandingViewProps {
    onProductClick: (product: Product) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onProductClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overflow-hidden"
        >
            <HeroSection />
            <TrustSection />
            <CategoriesSection />
            <ValuesSection />
            <ProductsSection onProductClick={onProductClick} />
            <TestimonialsSection />
            <NewsletterSection />
        </motion.div>
    );
};

export default LandingView;

