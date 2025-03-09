const fs = require('fs');
const https = require('https');
const path = require('path');

// Configuration
const config = {
    hero: {
        width: 1920,
        height: 1080,
        count: 1,
        path: 'assets/hero',
        filename: 'hero-bg.jpg'
    },
    gallery: {
        width: 800,
        height: 600,
        count: 2, // Will generate 2 sets (before/after) for each service
        services: ['car-polish', 'headlights', 'interior'],
        path: 'assets/gallery'
    },
    testimonials: {
        width: 200,
        height: 200,
        count: 3,
        path: 'assets/testimonials',
        filename: 'testimonial-{n}.jpg'
    }
};

// Create directories if they don't exist
function createDirectories() {
    Object.values(config).forEach(conf => {
        const dirPath = conf.path;
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        
        // Create service subdirectories for gallery
        if (conf.services) {
            conf.services.forEach(service => {
                const servicePath = path.join(conf.path, service);
                if (!fs.existsSync(servicePath)) {
                    fs.mkdirSync(servicePath, { recursive: true });
                }
            });
        }
    });
}

// Generate placeholder image URL
function getPlaceholderUrl(width, height, id) {
    return `https://placehold.co/${width}x${height}`;
}

// Download image
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                // Handle redirects
                https.get(response.headers.location, (redirectResponse) => {
                    if (redirectResponse.statusCode !== 200) {
                        reject(new Error(`Failed to download after redirect: ${redirectResponse.statusCode}`));
                        return;
                    }
                    const fileStream = fs.createWriteStream(filepath);
                    redirectResponse.pipe(fileStream);
                    fileStream.on('finish', () => {
                        fileStream.close();
                        resolve();
                    });
                }).on('error', reject);
                return;
            }

            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download: ${response.statusCode}`));
                return;
            }

            const fileStream = fs.createWriteStream(filepath);
            response.pipe(fileStream);

            fileStream.on('finish', () => {
                fileStream.close();
                resolve();
            });
        }).on('error', reject);
    });
}

// Generate images
async function generateImages() {
    try {
        createDirectories();

        // Generate hero image
        console.log('Generating hero image...');
        await downloadImage(
            getPlaceholderUrl(config.hero.width, config.hero.height, 1),
            path.join(config.hero.path, config.hero.filename)
        );

        // Generate gallery images
        console.log('Generating gallery images...');
        for (const service of config.gallery.services) {
            for (let i = 1; i <= config.gallery.count; i++) {
                const beforePath = path.join(config.gallery.path, service, `${service}-${i}-before.jpg`);
                const afterPath = path.join(config.gallery.path, service, `${service}-${i}-after.jpg`);
                
                await downloadImage(
                    getPlaceholderUrl(config.gallery.width, config.gallery.height, i * 2),
                    beforePath
                );
                await downloadImage(
                    getPlaceholderUrl(config.gallery.width, config.gallery.height, i * 2 + 1),
                    afterPath
                );
            }
        }

        // Generate testimonial images
        console.log('Generating testimonial images...');
        for (let i = 1; i <= config.testimonials.count; i++) {
            const filename = config.testimonials.filename.replace('{n}', i);
            await downloadImage(
                getPlaceholderUrl(config.testimonials.width, config.testimonials.height, i),
                path.join(config.testimonials.path, filename)
            );
        }

        console.log('All placeholder images generated successfully!');
    } catch (error) {
        console.error('Error generating images:', error);
    }
}

// Run the generator
generateImages(); 