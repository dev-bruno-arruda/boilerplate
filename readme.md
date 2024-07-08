src/
├── common/
│   └── decorators/
│   └── filters/
│   └── interceptors/
│   └── middlewares/
│   └── pipes/
├── config/
│   └── typeorm.config.ts
├── core/
│   ├── abstracts/
│   │   ├── i-data-services.ts
│   │   ├── i-crm-services.ts
│   ├── dtos/
│   │   ├── create-book.dto.ts
│   │   ├── update-book.dto.ts
│   │   ├── create-author.dto.ts
│   │   ├── update-author.dto.ts
│   │   ├── create-genre.dto.ts
│   │   ├── update-genre.dto.ts
│   ├── entities/
│   │   ├── author.entity.ts
│   │   ├── book.entity.ts
│   │   └── genre.entity.ts
├── modules/
│   ├── author/
│   │   ├── author.controller.ts
│   │   ├── author.module.ts
│   │   ├── author.repository.ts
│   │   ├── author.service.ts
│   │   ├── author.usecases.ts
│   │   └── author.factory.ts
│   ├── book/
│   │   ├── book.controller.ts
│   │   ├── book.module.ts
│   │   ├── book.repository.ts
│   │   ├── book.service.ts
│   │   ├── book.usecases.ts
│   │   └── book.factory.ts
│   ├── genre/
│   │   ├── genre.controller.ts
│   │   ├── genre.module.ts
│   │   ├── genre.repository.ts
│   │   ├── genre.service.ts
│   │   ├── genre.usecases.ts
│   │   └── genre.factory.ts
├── tests/
│   ├── author/
│   ├── book/
│   └── genre/
├── app.module.ts
├── main.ts