Angular Hogwarts TDD Kata
=========================

Introduction
------------

Hogwarts has embraced Muggle Technology!

You have been hired to create Hogwarts online student registration.

Because you have the discipline of a Wizard, you will be writing it test first.

Setup
-----

First Story: Show Course Catalog
--------------------------------

Acceptance: Students will be able to see a catalog of classes.



How will you start? **First I will create the html to display the catalog inside the ``<tbody>`` tag.**


### UI For Course Catalog

```html
<!-- catalog/catalog.html -->

                <tr ng-repeat="course in catalog">
                    <td>{{course.name}}</td>
                    <td>{{course.startTime | date: 'h:mm a'}}</td>
                    <td>{{course.professor}}</td>
                    <td>{{course.credits}}</td>
                </tr>
```

I see you are planning on having a ``catalog`` on the ``CatalogController`` scope. **Yes**

How will you load it? **I will load it when the Controller loads.**

### Test 1: Erroring

Can you write a test for this? **Yes!**

```js
// test/catalog/catalog-controller-specs.js

describe('CatalogController', function () {

    describe('when the controller first loads', function () {

        it('should retrieve the course catalog', function () {
            expect(mockCatalogRepository.getCatalog.called).toBeTruthy();
        });

    });

});
```

Will this pass? **No, it doesn't even fail it errors. It need some setup before it can even fail. But I will load into my browser just to see the error. I will also open the developer tools to see any compiler errors.**

What do you see? **Error cannot read property 'getCatalog' of undefined. It means my mockCatalogRepository is not setup.**

### Test 1: Failing

```js
// test/catalog/catalog-controller-specs.js

...
describe('CatalogController', function () {

    var mockCatalogRepository;
    var catalog = ["catalog"];

    beforeEach(function () {
        module("hogwartsApp");

        inject(function ($rootScope, $controller, CatalogRepository) {
            scope = $rootScope.$new();

            mockCatalogRepository = sinon.stub(CatalogRepository);
            mockCatalogRepository.getCatalog.returns(catalog);

            $controller("CatalogController", { $scope: scope, CatalogRepository: mockCatalogRepository  });
        });
    });
```

Does it pass now? **No, but we are making progress. We are seeing a failing test. Yeah!**

Can you explain the setup? **We are creating a mock repository and a temporary scope. We are then initializing the CatalogControler with thoses mocks.**

### Test 1: Passing

How do you make it pass? **The test says we have to call getCatalog on the repository when CatalogController in initialized.**


```js
// catalog/js/catalog-controller.js

'use strict';

hogwartsApp
    .controller("CatalogController", ['$scope', 'CatalogRepository', function ($scope, catalogRepository) {
        catalogRepository.getCatalog();
    }]);
```

### Test 2

With your first test passing, are you done? **No we are not hooked up to the scope.**

```js
// test/catalog/catalog-controller-specs.js

...

    describe('when the controller first loads', function () {

        ...

        it('should put the catalog on the scope', function() {
            expect(scope.catalog).toEqual(catalog)
        });

        ...
```


```js
// catalog/js/catalog-controller.js

...
    .controller("CatalogController", ['$scope', 'CatalogRepository', function ($scope, catalogRepository) {
        $scope.catalog = catalogRepository.getCatalog();
    }]);
```

        //$scope.catalog = 
        $scope.register = function(courseId) {
            $scope.response = registrationService.register(courseId);
        };


        it('should put the catalog on the scope', function() {
            expect(scope.catalog).toEqual(catalog)
        });


                    <td><a href="javascript:void(0);" ng-click="register(course.id)">Register</a></td>



    var scope, mockCatalogRepository, mockRegistrationService;
    var catalog = [{foo: 'bar'}];

    beforeEach(function () {
        module("hogwartsApp");

        inject(function ($rootScope, $controller, CatalogRepository, RegistrationService) {
            scope = $rootScope.$new();

            mockCatalogRepository = sinon.stub(CatalogRepository);
            mockCatalogRepository.getCatalog.returns(catalog);

            mockRegistrationService = sinon.stub(RegistrationService);

            $controller("CatalogController", { $scope: scope, CatalogRepository: mockCatalogRepository  });
        });
    });

, RegistrationService

# vim: set ff=unix:
